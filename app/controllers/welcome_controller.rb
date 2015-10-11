class WelcomeController < ApplicationController
  # before_action :domain_backlink_data_check # ここでこれを入れると無限ループになる。
  before_action :backlink_icon

  def index
    domain_backlink_data_check
     # @domains = Domain.all
    @domains_ok = Domain.where(ngcheck: "ok")
    @backlinks = Backlink.all
  end
end
