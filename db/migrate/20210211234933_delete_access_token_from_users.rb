class DeleteAccessTokenFromUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :access_token
  end
end
