﻿using System;
using System.Collections.Generic;

namespace backend_app.Models;

public partial class Config
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Value { get; set; }
}
