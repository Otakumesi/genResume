require 'rails_helper'

RSpec.describe "documents/edit", type: :view do
  before(:each) do
    @document = assign(:document, Document.create!(
      :content => "MyString",
      :user_id => 1
    ))
  end

  it "renders the edit document form" do
    render

    assert_select "form[action=?][method=?]", document_path(@document), "post" do

      assert_select "input#document_content[name=?]", "document[content]"

      assert_select "input#document_user_id[name=?]", "document[user_id]"
    end
  end
end
