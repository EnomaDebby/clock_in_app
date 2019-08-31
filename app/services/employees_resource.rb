class EmployeesResource

  def as_json(*)
    Employee.all.map{|employee| { id: employee.id, name: employee.name }}
  end
end