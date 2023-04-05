class SessionsController < ApplicationController
  skip_before_action :authorize, only: :create

  def create
    user = User.find_by!(email: params[:email])
    if user && user.password == params[:password]
      session[:user_id] = user.id
      render json: user
    else
      render json: {errors: ["Invalid email or password"]}, status: :unauthorized
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end
end

    # def create
    #     user = User.find_by(email: params[:email])
    #     if user &.authenticate(params[:password])
    #       session[:email] = user.email
    #       render json: user
    #     else
    #       render json: { errors: ['Invalid email address or password'] }, status: :unprocessable_entity
    #     end
    #   end
    
    #   def destroy
    #     session.delete(:email)
    #     head :no_content
    #   end
    # end

