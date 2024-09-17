# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end
    # search_condition
    field :create_search_condition, mutation: Mutations::SearchCondition::CreateSearchCondition
    field :update_search_condition, mutation: Mutations::SearchCondition::UpdateSearchCondition
    field :remove_search_condition, mutation: Mutations::SearchCondition::RemoveSearchCondition

    # line
    field :create_line, mutation: Mutations::Line::CreateLine
    field :update_line, mutation: Mutations::Line::UpdateLine
    field :remove_line, mutation: Mutations::Line::RemoveLine

    # code
    field :create_code, mutation: Mutations::Code::CreateCode
    field :update_code, mutation: Mutations::Code::UpdateCode
    field :remove_code, mutation: Mutations::Code::RemoveCode

    # factory
    field :create_factory, mutation: Mutations::Factory::CreateFactory
    field :update_factory, mutation: Mutations::Factory::UpdateFactory
    field :remove_factory, mutation: Mutations::Factory::RemoveFactory

    # product
    field :create_product, mutation: Mutations::Product::CreateProduct
    field :update_product, mutation: Mutations::Product::UpdateProduct
    field :remove_product, mutation: Mutations::Product::RemoveProduct

    # line_user
    field :create_line_user, mutation: Mutations::LineUser::CreateLineUser
    field :update_line_user, mutation: Mutations::LineUser::UpdateLineUser
    field :remove_line_user, mutation: Mutations::LineUser::RemoveLineUser

    # line_error
    field :create_line_error, mutation: Mutations::LineError::CreateLineError
    field :update_line_error, mutation: Mutations::LineError::UpdateLineError
    field :remove_line_error, mutation: Mutations::LineError::RemoveLineError
  end
end
