class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # index
  def index
    render json: Session.all
  end

  # show
  def show
      render json: Session.find(params["id"])
  end

  # create
  def create
      render json: Session.create(params["session"])
  end

  # delete
  def delete
    render json: Session.delete(params["id"])
  end

  # update
  def update
    render json: Session.update(params["id"], params["session"])
  end
end
