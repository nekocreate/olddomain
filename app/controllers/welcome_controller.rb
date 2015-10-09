class WelcomeController < ApplicationController
  before_action :backlink_icon
  def index

    # @domains = Domain.all
    @domains = Domain.where(ngcheck: "ok")
    @backlinks = Backlink.all
  end
end
