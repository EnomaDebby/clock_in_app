class HomeController < ApplicationController

  def index
    if current_user
      redirect_to events_path
    end
  end
end