require 'rails_helper'

RSpec.describe Document, type: :model do

  let(:document) { create(:document) }
  it { expect(document).to respond_to(:content) }
  it { expect(document).to respond_to(:user_id) }
  it { expect(document).to respond_to(:user) }
end
