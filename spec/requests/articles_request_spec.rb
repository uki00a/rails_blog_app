require 'rails_helper'

RSpec.describe "Articles", type: :request do
  describe "GET /articles" do
    before { get "/articles" }

    it "returns a 200" do
      expect(response).to have_http_status(:success)
    end

    it "returns a json response" do
      expect(response.content_type).to include("application/json")
    end
  end

  describe "GET /articles/:id" do
    let(:article) { create(:article, title: "foo", body: "bar") }
    before { get "/articles/#{article.id}" }

    it "returns a 200" do
      expect(response).to have_http_status(:success)
    end

    it "returns a json response" do
      expect(response.content_type).to include("application/json")
    end

    it "returns a article" do
      expect(response.parsed_body["id"]).to eq(article.id)
      expect(response.parsed_body["title"]).to eq(article.title)
      expect(response.parsed_body["body"]).to eq(article.body)
      expect(response.parsed_body["user"]["id"]).to eq(article.user.id)
    end
  end

  describe "POST /articles" do
    context "when unaunthenticated" do
      before { post "/articles", params: {article: {title: "foo", body: "bar"}} }

      it "returns a 401" do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when authenticated" do
      let(:user) { create(:user) }
      before { post "/articles",
                 params: {article: {title: "foo", body: "bar"}},
                 headers: authenticated_headers(user) }

      it "returns a 201" do
        expect(response).to have_http_status(:created)
      end

      it "returns a json response and creates a new article" do
        expect(response.content_type).to include("application/json")
        expect(response.parsed_body["id"]).to be_a(Numeric)
        article = Article.find(response.parsed_body["id"])
        expect(article.title).to eq("foo")
        expect(article.body).to eq("bar")
        expect(article.user_id).to eq(user.id)
      end
    end
  end
end
