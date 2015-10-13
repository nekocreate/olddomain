class WelcomeController < ApplicationController
  # before_action :domain_backlink_data_check # ここでこれを入れると無限ループになる。
  before_action :images_icons

  def index
    domain_backlink_data_check
     # @domains = Domain.all
    @domains_ok = Domain.where(ngcheck: "ok")
    @backlinks = Backlink.all
  end

  # Domain Backlink テーブルにデータがなければリダイレクト
  def domain_backlink_data_check
    if !Domain.exists? || !Backlink.exists?
      redirect_to welcome_no_data_path
    end
  end
end
