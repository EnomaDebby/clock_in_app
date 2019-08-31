class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception


  private

  def after_sign_in_path_for(resource_or_scope)
    user_events_path(resource)
  end

  def after_update_path_for(resource)
    user_events_path(resource)
  end
end
