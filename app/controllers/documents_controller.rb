class DocumentsController < ApplicationController
  before_action :set_document, only: [:show, :edit, :update, :destroy]
  before_action :set_user, only: [:index, :new, :create, :edit, :update]
  before_action :authenticate_user!
  before_action :user_has_authority, only: [:index, :new, :create, :edit, :update]

  # GET /documents
  # GET /documents.json
  def index
    @documents = @user.documents.page(params[:page]).per(10)
  end

  # GET /documents/1.json
  def show
    respond_to do |format|
      format.json {}
      format.html do
        render layout: "raw_output"
      end
    end
  end

  # GET /documents/new
  def new
    @document = @user.documents.build
  end

  # GET /documents/1/edit
  def edit
  end

  # POST /documents
  # POST /documents.json
  def create
    @document = @user.documents.create(document_params)

    respond_to do |format|
      if @document.save
        format.html { redirect_to user_document_path(@user, @document), notice: "Document was successfully created." }
        format.json { render json: { document_id: @document.id }, status: :created }
      else
        format.html { render :new }
        format.json { render json: { errMsg: "入力値にいれられない値が入っております。" }, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /documents/1
  # PATCH/PUT /documents/1.json
  def update
    respond_to do |format|
      if @document.update(document_params)
        format.html { redirect_to user_document_path(@user, @document), notice: "Document was successfully updated." }
        format.json { render json: { document_id: @document.id }, status: :ok }
      else
        format.html { render :edit }
        format.json { render json: { errMsg: @document.errors.full_messages }, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /documents/1
  # DELETE /documents/1.json
  def destroy
    @document.destroy
    respond_to do |format|
      format.html { redirect_to root_url, notice: "Document was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_document
    @document = Document.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def document_params
    params.require(:document).permit(:content, :title, :user_id)
  end

  def user_has_authority
    unless current_user.admin? || current_user.id == params[:user_id].to_i
      flash[:error] = "異なるユーザーのドキュメントを操作することはできません。"
      redirect_to root_url
    end
  end
end
