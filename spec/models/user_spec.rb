require 'rails_helper'

RSpec.describe User, type: :model do
  context "when initialized" do
    it "should have a randomly generated password" do
      expect(User.new.password.blank?).to be(false)
    end
  end
end
