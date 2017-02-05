FactoryGirl.define do
  factory :document do
    content { Faker::Lorem.paragraphs }
    user
  end
end
