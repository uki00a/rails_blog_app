module AuthHelpers
  def authenticated_headers(user)
    auth_token = ::Knock::AuthToken::new(payload: { sub: user.id })
    {
      "Authorization": "Bearer #{auth_token.token}"
    }
  end
end
