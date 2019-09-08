class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  # index
  def index
    render json: User.all
  end

  # show
  def show
      render json: User.find(params["id"])
  end

  # create
  def create
      render json: User.create(params["user"])
  end

  # delete
  def delete
    render json: User.delete(params["id"])
  end

  # update
  def update
    render json: User.update(params["id"], params["post"])
  end
end
