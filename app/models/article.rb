class Article < ApplicationRecord
  belongs_to :user

  # TODO Use active_model_serializer
  def serialize
    {
      id: id,
      title: title,
      body: body,
      user: user.serialize,
    }
  end
end
