class ApplicationController < ActionController::API
  include ActionController::Cookies
  
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_error
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize


  # def require_login
  #   unless logged_in?
  #     redirect_to login_path, alert: "You must be logged in to access this page"
  #   end
  # end

  # def logged_in?
  #   !!current_user

  # end  
  # def render_not_found_response
  #   render json: { error: "User not found" }, status: :not_found
  # end

  # def show_record_errors(exception)
  #   redirect_back_or_to root_url, alert: exception.record.errors.full_messages.to_sentence
  # end

  # def current_user
  #   @current_user ||= User.find_by(email: session[:email]) if session[:email]

  # end

  private
  
  def render_not_found_error
    render json: {errors: "#{controller_name.classify} not found"}, status: :unprocessable_entity
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def authorize
    @current_user = User.find_by(id: session[:user_id])
    render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
  end

end
