require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe "GET /users" do
    before { get "/users" }

    it "returns 200" do
      expect(response).to have_http_status(:success)
    end

    it "returns a json response" do
      expect(response.content_type).to include("application/json")
    end
  end

  describe "GET /users/:id" do
    let(:user) { create(:user, name: "hoge") }
    before { get "/users/#{user.id}" }

    it "returns a 200" do
      expect(response).to have_http_status(:success)
    end

    it "returns a user" do
      expect(response.content_type).to include("application/json")
      expect(response.parsed_body["id"]).to eq(user.id)
      expect(response.parsed_body["name"]).to eq(user.name)
      expect(response.parsed_body["email"]).to eq(user.email)
    end
  end

  describe "POST /users" do
    before do
      post "/users", params: {user: {name: "hoge"}}
    end

    it "returns a 201" do
      expect(response).to have_http_status(:created)
    end

    it "returns a json response and creates a new user" do
      expect(response.content_type).to include("application/json")
      expect(response.parsed_body["id"]).to be_a(Numeric)
      user = User.find(response.parsed_body["id"])
      expect(user.name).to eq("hoge")
    end
  end

  describe "GET /users/:id/articles" do
    let!(:user) { create(:user) }
    let!(:user2) { create(:user) }
    let!(:article_written_by_user) { create(:article, user: user) }
    let!(:article_not_written_by_user) { create(:article, user: user2) }

    before { get "/users/#{user.id}/articles" }

    it "returns a 200" do
      expect(response).to have_http_status(:success)
    end

    it "returns articles written by a specified user" do
      expect(response.content_type).to include("application/json")
      expect(response.parsed_body).to be_an(Array)
      expect(response.parsed_body.size).to eq(1)
      expect(response.parsed_body[0]["id"]).to eq(article_written_by_user.id)
    end
  end
end
