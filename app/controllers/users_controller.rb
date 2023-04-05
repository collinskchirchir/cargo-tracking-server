class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]
    # GET /users
  def index
    users = User.all
    render json: users, status: :ok
  end

  # GET /users/:id
  def show
    user = User.find(session[:user_id])
    if user
      render json: user
    else
     
      render json: {error: "User not found"}, status: 401
    end
  end

  # POST /users
  def create
    user = User.create!(user_params)
    render json: user, status: :created
  end

  # def create
  #   user = User.create!(user_params)
  #   if user.valid?
  #       session[:user_id] = user.id
  #       render json: user, status: 201
  #   else
  #       rendor json: {errors: "User invalid"}, status: 422
  #   end
  # end

  # PATCH /users/:id
  def update
    user = find_user
    user.update!(user_params)
    render json: user, status: :accepted
  end
  
  # DELETE /users/:id
  def destroy
    user = find_user
    user.destroy    
    head :no_content
  end

  private
  def user_params
    params.permit(:email, :password, :is_admin, :first_name, :last_name, :address, :country)
  end

  def find_user
    User.find_by!(id: params[:id])
  end


end
