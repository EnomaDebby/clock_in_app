class EventsController < ApplicationController
  def index
    redirect_to root_path and return unless current_user
    @events = current_user.events.all.order(logged_at: :desc)
  end

  def new; end

  def edit; end

  def show
    render json: EventResource.new(event)
  end

  def create

    user = User.find_by_email(event_params[:email])

    handle_unauthenticated_user(user) and return
    sign_in_user(user)

    event = current_user.events.new(event_params)

    service = EventService.new(event, event_params)
    if service.save
      render json: {}
      flash[:notice] = "Entry created successfully"
    else
      errors = ResourceErrors.format(event)
      render json: {errors: errors}, status: 400
    end
  end

  def update
    event = current_user.events.find(params[:id])
    service = EventService.new(event, event_params)
    if service.save
      render json: {}
      flash[:notice] = "Entry updated successfully"
    else
      errors = ResourceErrors.format(event)
      render json: {errors: errors}, status: 400
    end
  end

  def destroy
    if event.destroy
      redirect_to events_path
      flash[:notice] = "Entry deleted successfully"
    else
      redirect_to events_path
      flash[:notice] = "Unable to delete entry"
    end
  end

  private

  def event
    current_user.events.find(params[:id])
  end

  def event_params
    params.require(:event).permit(:logged_at, :event_type, :reason, :email, :password)
  end

  def handle_unauthenticated_user(user)
    unless current_user or (user.present? && user.valid_password?(event_params[:password]))
      render(json: {errors: [{attribute: "login", error: 'Please provide a valid email and password to proceed'}]}, status: 400)
    end
  end

  def sign_in_user(user)
    if user.present? && user.valid_password?(event_params[:password])
      sign_in(user, scope: :user)
    end
  end
end