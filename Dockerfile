FROM ruby:2.4

ARG INSTALL_DEPENDENCIES
RUN apt-get update -qq \
  && apt-get install -y --no-install-recommends ${INSTALL_DEPENDENCIES} \
    build-essential libpq-dev \
    nodejs git \
  && apt-get clean autoclean \
  && apt-get autoremove -y \
  && rm -rf \
    /var/lib/apt \
    /var/lib/dpkg \
    /var/lib/cache \
    /var/lib/log

RUN mkdir /app
WORKDIR /app
COPY Gemfile* /app/
ARG BUNDLE_INSTALL_ARGS
RUN gem install bundler && bundle install ${BUNDLE_INSTALL_ARGS} \
  && rm -rf /usr/local/bundle/cache/* \
  && find /usr/local/bundle/gems/ -name "*.c" -delete \
  && find /usr/local/bundle/gems/ -name "*.o" -delete
COPY . /app/

RUN bundle exec rake assets:precompile;
RUN cd /client && yarn install && yarn build fi





# CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]