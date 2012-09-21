require "susy"

module Sass::Script::Functions
    def getRandomColor()
        Sass::Script::String.new("#%06x" % (rand * 0xffffff))
    end
end

module Sass::Script::Functions
  def random()
      rand(1.0)
  end
end

http_path        = "/"
css_dir          = "css"
sass_dir         = "scss"
javascripts_dir  = "js"
images_dir       = "images"
fonts_dir        = "fonts"
project_type     = :stand_alone
environment      = :development
output_style     = :expanded
relative_assets  = true
line_comments    = false
disable_warnings = false
preferred_syntax = :scss
