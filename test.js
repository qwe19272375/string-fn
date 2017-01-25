const R = require("rambda")
const stringFn = require("./source")

describe("words", () => {
  it("should work", () => {
    
    expect(
      stringFn.words("fooBarBaz")
    ).toEqual(["foo", "Bar", "Baz"])
  })
})

describe("between", () => {
  it("should work", () => {
    
    expect(
      stringFn.between("begin foobarbaz end","foo","baz")
    ).toEqual("bar")
    
    expect(
      stringFn.between("begin foo   bar   baz end","foo","baz")
    ).toEqual("bar")
  })
})

describe("reverse", () => {
  it("should work", () => {
    
    expect(
      stringFn.reverse("fooBarBaz")
    ).toEqual("zaBraBoof")
  })
})

describe("stripTags", () => {
  it("should work", () => {
    
    expect(
      stringFn.stripTags("<p>foo <b>bar</b>   <hr/> baz</p>")
    ).toEqual("foo bar baz")
  })
})

describe("stripPunctuation", () => {
  it("should work", () => {
    
    expect(
      stringFn.stripPunctuation("If my wings should fail me, Lord, please meet me ...")
    ).toEqual("If my wings should fail me Lord please meet me ")
  })
})

describe("replaceFirst", () => {
  it("should work", () => {
    expect(
      stringFn.replaceFirst("fooBarBaz","F")
    ).toEqual("FooBarBaz")
  })
  
  it("should work", () => {
    expect(
      stringFn.replaceFirst("fooBarBaz")
    ).toEqual("ooBarBaz")
  })
})

describe("replaceLast", () => {
  it("should work", () => {
    expect(
      stringFn.replaceLast("fooBarBaz","ZZ")
    ).toEqual("fooBarBaZZ")
  })
  
  it("should work", () => {
    expect(
      stringFn.replaceLast("fooBarBaz")
    ).toEqual("fooBarBa")
  })
})

describe("distance", () => {
  it("should work", () => {
    expect(
      stringFn.distance("foobarbaz","ffoobarbaz")
    ).toEqual(1)
    
    expect(
      stringFn.distance("foobarbaz","foo")
    ).toEqual(6)
    
    expect(
      stringFn.distance("foo","foobarbaz")
    ).toEqual(6)
    
    expect(
      stringFn.distance("foobarbaz","foobarbaz")
    ).toEqual(0)
  })
})

describe("distanceGerman", () => {
  it("should work", () => {
    expect(
      stringFn.distanceGerman("foobarbaz","ffoobarbaz")
    ).toEqual(1)
    
    expect(
      stringFn.distanceGerman("schön","shön")
    ).toEqual(1)
    
    expect(
      stringFn.distanceGerman("Müde","mude")
    ).toEqual(0)
    
    expect(
      stringFn.distanceGerman("die Männer","die manner")
    ).toEqual(0)
    
    expect(
      stringFn.distanceGerman("der anlass","der Anlaß")
    ).toEqual(0)
  })
})

describe("surround", () => {
  it("should work", () => {

    expect(
      stringFn.surround("foo","<br/>")
    ).toEqual("<br/>foo<br/>")
  })
  
  it("should work", () => {

    expect(
      stringFn.surround("foo","<b>","</b>")
    ).toEqual("<b>foo</b>")
  })
})

describe("shuffle", () => {
  it("should work", () => {

    expect(
      R.equals(
        stringFn.shuffle("fooBarBaz"),
        "fooBarBaz"
      )
    ).toBeFalsy()
  })
})

describe("count", () => {
  it("should work", () => {
    expect(
      stringFn.count("fooBarfoo","foo")
    ).toEqual(2)

    expect(
      stringFn.count("fooBarfoo","baz")
    ).toEqual(0)

    expect(
      stringFn.count("foo1 Bar foo1 baz Foo1 foo1","foo1")
    ).toEqual(3)
  })
})

describe("camelCase", () => {
  it("should work", () => {
    expect(
      stringFn.camelCase("foo bar BAZ")
    ).toEqual("fooBarBaz")
  })

  it("should work with ö", () => {
    expect(
      stringFn.camelCase("foo bar bazö",true)
    ).toEqual("fooBarBazö")
  })
})

describe("snakeCase", () => {
  it("should work", () => {
    expect(
      stringFn.snakeCase("foo bar BAZ")
    ).toEqual("foo_bar_baz")
  })

  it("should work with ö", () => {
    expect(
      stringFn.snakeCase("foo bar bazö",true)
    ).toEqual("foo_bar_bazö")
  })
})

describe("titleCase", () => {
  it("should work", () => {
    expect(
      stringFn.titleCase("foo bar BAZ")
    ).toEqual("Foo Bar Baz")
  })

  it("should work with ö", () => {
    expect(
      stringFn.titleCase("foo bar bazö",true)
    ).toEqual("Foo Bar Bazö")
  })
})

describe("kebabCase", () => {
  it("should work with camel case", () => {
    expect(
      stringFn.kebabCase("fooBarBaz")
    ).toEqual("foo-bar-baz")
  })

  it("should work with snake case", () => {
    expect(
      stringFn.kebabCase("foo_bar_baz")
    ).toEqual("foo-bar-baz")
  })

  it("should work as lodash", () => {
    expect(
      stringFn.kebabCase("Foo Bar BAZ")
    ).toEqual("foo-bar-baz")

    expect(
      stringFn.kebabCase("__FOO_BAR__")
    ).toEqual("foo-bar")

    expect(
      stringFn.kebabCase("Foo Bar BAZ")
    ).toEqual("foo-bar-baz")
  })
})
