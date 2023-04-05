class TrackingsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :show_record_errors
  
    # GET /trackings
  def index
    trackings = Tracking.all
    render json: trackings, status: :ok
  end

  # GET /trackings/:id
  def show
    tracking = find_tracking
    render json: tracking, status: :accepted
  end

  # POST /trackings
  def create
    tracking = Tracking.create!(tracking_params)
    render json: tracking, status: :created
  end

  # PATCH /trackings/:id
  def update
    tracking = find_tracking
    tracking.update!(tracking_params)
    render json: tracking, status: :accepted
  end
  
  # DELETE /trackings/:id
  def destroy
    tracking = find_tracking
    tracking.destroy    
    head :no_content
  end

  private
  def tracking_params
    params.permit(:package_status, :location, :comment, :expected_arrival)
  end

  def find_tracking
    Tracking.find_by!(id: params[:id])
  end

  def render_not_found_response
    render json: { error: "Tracking not found" }, status: :not_found
  end

  def show_record_errors(exception)
    redirect_back_or_to root_url, alert: exception.record.errors.full_messages.to_sentence
  end
end
