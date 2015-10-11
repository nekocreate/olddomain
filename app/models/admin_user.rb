class AdminUser < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  
  # 管理者ユーザーはフォームからは登録させずに、コンソールから直接作成するため、
  # registerable, recoverable の Devise モジュールを無効
  # :registerable, :recoverable
  devise :database_authenticatable, :rememberable, :trackable, :validatable

end
