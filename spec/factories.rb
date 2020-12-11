FactoryBot.define do
  factory :article do
    title { "MyText" }
    body { "MyText" }
    user
  end

  factory :user, class: User do
    name { "hoge" }
    email { "test@example.com" }
    password_digest { "XXXX" }
  end
end
