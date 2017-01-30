require 'rails_helper'

RSpec.describe "documents/new", type: :view do
  before(:each) do
    assign(:document, Document.new(
      :content => "MyString",
      :user_id => 1
    ))
  end

  it "renders new document form" do
    render

    assert_select "form[action=?][method=?]", documents_path, "post" do

      assert_select "input#document_content[name=?]", "document[content]"

      assert_select "input#document_user_id[name=?]", "document[user_id]"
    end
  end
end
