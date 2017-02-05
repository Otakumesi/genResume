class Api::V1::DocumentsController < ApplicationController
  def show
    @document = Document.find(params[:id])
    render json: @document
  end
end
