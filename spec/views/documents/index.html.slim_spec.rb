require 'rails_helper'

RSpec.describe "documents/index", type: :view do
  before(:each) do
    assign(:documents, [
      Document.create!(
        :content => "Content",
        :user_id => 2
      ),
      Document.create!(
        :content => "Content",
        :user_id => 2
      )
    ])
  end

  it "renders a list of documents" do
    render
    assert_select "tr>td", :text => "Content".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
  end
end
