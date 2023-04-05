class PackagesController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
rescue_from ActiveRecord::RecordInvalid, with: :show_record_errors

    # GET /packages
  def index
    packages = Package.all
    render json: packages, status: :ok
  end

  # GET /packages/:id
  def show
    package = find_package
    render json: package, include: ['shipment', 'shipment.trackings'], status: :accepted
  end

  # POST /packages
  def create
    package = Package.create!(package_params)
    render json: package, status: :created
  end

  # PATCH /packages/:id
  def update
    package = find_package
    package.update!(package_params)
    render json: package, status: :accepted
  end
  
  # DELETE /packages/:id
  def destroy
    package = find_package
    package.destroy    
    head :no_content
  end

  private
  def package_params
    params.permit(:height, :width, :depth, :cost, :full_name, :email, :phone_contact, :paid_status, :user_id, :shipment_id)
  end

  def find_package
    Package.find_by!(id: params[:id])
  end

  def render_not_found_response
    render json: { error: "Package not found" }, status: :not_found
  end

  def show_record_errors(exception)
    # redirect_back_or_to root_url, alert: exception.record.errors.full_messages.to_sentence
    render json: { error: exception.record.errors.full_messages}
  end
end
