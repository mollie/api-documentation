def exists_in_list(value, valid_values):
    """
    :type value: string
    :type valid_values: list
    :rtype: string
    """
    if not value:
        error = "must supply a value; choose from {}"
        raise ValueError(error.format(list))

    if value not in valid_values:
        error = "'{}' unknown; choose from {}"
        raise ValueError(error.format(value, valid_values))

    return value


def validate_bool(argument):
    """
    :type argument: string
    :rtype: bool
    """
    exists_in_list(argument, ["true", "false"])
    return argument == "true"
