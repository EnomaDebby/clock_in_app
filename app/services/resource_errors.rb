class ResourceErrors
  def self.format(resource)
    resource.errors.messages.map do |key, value|
      {
        title: "Invalid Attribute",
        attribute: key.to_s.split(".")[-1],
        detail: resource.errors.full_messages_for(key)[0],
        error: value[0]
      }
    end
  end
end