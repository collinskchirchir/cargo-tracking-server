class ShipmentsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :show_record_errors

  def index
    shipments = Shipment.all
    render json: shipments, include: ['shipments'], status: :ok
  end

  def show
    shipment = find_shipment
    render json: shipment, status: :accepted
  end

  def create
    shipment = Shipment.create!(shipment_params)
    render json: shipment, status: :created
  end

  def update
    shipment = find_shipment
    shipment.update!(shipment_params)
    render json: shipment, status: :accepted
  end
  
  def destroy
    shipment = find_shipment
    shipment.destroy
    head :no_content
  end

  private
  def shipment_params
    params.permit(:origin, :destination, :departure, :arrival, :rate_per_cbm, :container_size_in_feet, :status)
  end

  def find_shipment
    Shipment.find_by(id: params[:id])
  end

  def render_not_found_response
    render json: { error: "Shipment not found" }, status: :not_found
  end

  def show_record_errors(exception)
    # redirect_back_or_to root_url, alert: exception.record.errors.full_messages.to_sentence
    render json: { error: exception.record.errors.full_messages}
  end

end
