FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    password "foobar"
    role 0
    after(:build) do |user|
      3.times do
        user.documents << create(:document, user: user)
      end
    end
  end
end
