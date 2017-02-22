require "rails_helper"

RSpec.describe DocumentsController, type: :controller do
  context "non required authentication" do
    describe "#show" do
      before do
        @document = create(:document)
        @user = @document.user
      end
      it "assigns a document as @document" do
        get :show, params: { id: @document.id, user_id: @user.id }
        expect(assigns(:document)).to eq(@document)
      end
    end
  end

  context "required authentication" do
    login_user
    before do
      @user = subject.current_user
    end

    describe "#new" do
      before { @document = @user.documents.build }
      it "assigns a new document as @document" do
        get :new, params: { id: @document.id, user_id: @user.id }
        expect(assigns(:document)).to be_a_new(Document)
      end

      it "renders the new view" do
        get :new, params: { id: @document.id, user_id: @user.id }
        expect(response).to render_template(:new)
      end
    end

    describe "#index" do
      before { @documents = @user.documents }
      it "assigns documents as @documents" do
        get :index, params: { user_id: @user.id }
        expect(assigns(:documents)).to eq(@documents)
      end

      it "renders the index view" do
        get :index, params: { user_id: @user.id }
        expect(response).to render_template(:index)
      end
    end

    describe "#edit" do
      before { @document = create(:document) }
      it "assigns is edit document" do
        get :edit, params: { id: @document.id, user_id: @user.id }
        expect(assigns(:document)).to eq(@document)
      end

      it "renders the edit view" do
        get :edit, params: { id: @document.id, user_id: @user.id }
        expect(response).to render_template(:edit)
      end
    end

    describe "#create" do
      context "with valid params" do
        before do
          @document = build(:document)
          @document_params = {
            title: @document.title,
            content: @document.content,
            user_id: @user.id,
          }
        end

        it "create a new document" do
          post :create, params: { user_id: @user.id, document: @document_params }
          expect(assigns(:document)).to be_a(Document)
          expect(assigns(:document)).to be_persisted
        end

        it "redirects to the document" do
          post :create, params: { user_id: @user.id, document: @document_params }
          assigns = assigns(:document)
          expect(response).to redirect_to(user_document_path(@user, assigns.id))
        end
      end
    end

    describe "#update" do
      before do
        @document = create(:document)
        @document_params = {
          title: "update title",
          content: "update content",
          user_id: @user.id,
        }
      end

      context "with valid params" do
        it "assigns the requested document as @document" do
          put :update, params: { id: @document.id, user_id: @user.id, document: @document_params }
          @document.reload
          expect(assigns(:document)).to eq(@document)
        end

        it "redirects to the document" do
          put :update, params: { id: @document.id, user_id: @user.id, document: @document_params }
          @document.reload
          expect(response).to redirect_to(user_document_path(@user, @document))
        end
      end
    end

    describe "#destory" do
      before { @document = create(:document) }
      it "destorys the requested document" do
        expect do
          delete :destroy, params: { id: @document.id, user_id: @user.id }
        end.to change(Document, :count).by(-1)
      end

      it "redirects to the documents list" do
        delete :destroy, params: { id: @document.id, user_id: @user.id }
        expect(response).to redirect_to(root_url)
      end
    end
  end
end
