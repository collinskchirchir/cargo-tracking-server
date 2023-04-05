class SearchesController < ApplicationController
  skip_before_action :authorize
  def create
    package = Package.find_by(id: params[:package_id])
    if package && package.email == params[:email]
      render json: package, include: ['shipment', 'shipment.trackings'], status: :ok
    else
      render json: {errors: ["Wrong tracking infomation provided"]}, status: :not_acceptable
    end
  end

  private

  def search_params
    params.permit(:package_id, :email)
  end
end
