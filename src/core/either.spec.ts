import { left, right, type Either } from "./either"

function doSomething(shouldSuccess: boolean): Either<string, string>{
  if(shouldSuccess){
    return right('success')
  }
    return left('error')
}

test('succes result', () => {
  const result = doSomething(true)

  expect(result.isRight()).toBe(true)  
  expect(result.isLeft()).toBe(false)
})

test('succes error', () => {
  const result = doSomething(false)

  expect(result.isLeft()).toBe(true)
  expect(result.isRight()).toEqual(false) 
})