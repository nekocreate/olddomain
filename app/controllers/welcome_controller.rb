class WelcomeController < ApplicationController
  before_action :backlink_icon
  def index

    @domains = Domain.all
    @backlinks = Backlink.all
  end
end
