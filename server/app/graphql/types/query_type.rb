# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [Types::NodeType, null: true], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ID], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end

    field :user, resolver: ::Resolvers::User::User
    field :users, resolver: ::Resolvers::User::Users

    # factory
    field :factories, resolver: ::Resolvers::Factory::Factories

    # product
    field :products, resolver: ::Resolvers::Product::Products

    # line
    field :lines, resolver: ::Resolvers::Line::Lines
    field :line, resolver: ::Resolvers::Line::Line

    # code
    field :codes, resolver: ::Resolvers::Code::Codes

    # line_error
    field :line_errors, resolver: ::Resolvers::LineError::LineErrors

    # line_user
    field :line_users, resolver: ::Resolvers::LineUser::LineUsers

    # report
    field :report_daily_line_codes, resolver: ::Resolvers::Report::ReportDailyLineCodes
    field :report_availability_rate, resolver: ::Resolvers::Report::ReportAvailabilityRate
    field :report_line_rate, resolver: ::Resolvers::Report::ReportLineRate
    field :report_errors, resolver: ::Resolvers::Report::ReportErrors

    # search_condition
    field :search_conditions, resolver: ::Resolvers::SearchCondition::SearchConditions
  end
end
