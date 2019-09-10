class Post
  # ===============================
  # SET UP
  # ===============================
  # add attribute readers for instance accesss
  attr_reader :id

if (ENV['DATABASE_URL'])
  uri = URI.parse(ENV['DATABASE_URL'])
  DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
else
	# connect to postgres
    DB = PG.connect({:host => "localhost", :port => 5432, :dbname => 'trendi_development'})
end

  # ===============================
  # PREPARED STATEMENTS
  # ===============================
  # create post
  DB.prepare("create_post",
    <<-SQL
      INSERT INTO posts (name, location, image, rank)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, location, image, rank;
    SQL
  )

  # update post
  DB.prepare("update_post",
    <<-SQL
      UPDATE posts
      SET name = $2, location = $3, image = $4, rank = $5
      WHERE id = $1
      RETURNING id, name, location, image, rank;
    SQL
  )

  # ===============================
  # ROUTES
  # ===============================
  # index
  def self.all
    results = DB.exec("SELECT * FROM posts ORDER BY rank DESC;")
    return results.map do |result|
      {
          "id" => result["id"].to_i,
          "name" => result["name"],
          "location" => result["location"],
          "image" => result["image"],
		  "rank" => result["rank"].to_i
      }
    end
  end

  # show
  def self.find(location)
    # query to find the posts
    results = DB.exec("SELECT * FROM posts WHERE location='#{location}' ORDER BY rank DESC;")
	return results.map do |result|
      {
          "id" => result["id"].to_i,
          "name" => result["name"],
          "location" => result["location"],
          "image" => result["image"],
		  "rank" => result["rank"].to_i
      }
    end
  end

  # create
  def self.create(opts)
    results = DB.exec_prepared("create_post", [opts["name"], opts["location"], opts["image"], opts["rank"].to_i])
	return {
	  "id" => results.first["id"].to_i,
  	  "name" => results.first["name"],
  	  "location" => results.first["location"],
  	  "image" => results.first["image"],
  	  "rank" => results.first["rank"].to_i
    }
  end

  # delete
  def self.delete(id)
    results = DB.exec("DELETE FROM posts WHERE id=#{id};")
    return { "deleted" => true }
  end

  # update
  def self.update(id, opts)
    results = DB.exec_prepared("update_post", [id, opts["name"], opts["location"], opts["image"], opts["rank"]])
    return {
		"id" => results.first["id"].to_i,
    	"name" => results.first["name"],
    	"location" => results.first["location"],
    	"image" => results.first["image"],
    	"rank" => results.first["rank"].to_i
    }
  end

end
