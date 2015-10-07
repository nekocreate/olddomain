class WelcomeController < ApplicationController
  def index

    @domains = Domain.all
    @backlinks = Backlink.all
  end
end
