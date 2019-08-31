class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, event_attributes: [:logged_at, :event_type, :reason]])
  end

  private

  def after_sign_in_path_for(resource_or_scope)
    events_path
  end

  def after_update_path_for(resource)
    events_path
  end
end
