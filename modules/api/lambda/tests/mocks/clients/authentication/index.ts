/*
 * Copyright (c) 2018 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import * as _ from "~/clients/authentication"
import { Session } from "~/clients/session"

import { mockSession } from "_/mocks/clients/session"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mock Authentication client authenticate operation
 *
 * @param promise - Promise returned by authentication client
 *
 * @return Jasmine spy
 */
export function mockAuthenticationClientAuthenticate<T>(
  promise: () => Promise<T>
): jasmine.Spy {
  const authenticate = jasmine.createSpy("authenticate")
    .and.callFake(promise)
  Object.defineProperty(_, "AuthenticationClient", {
    value: jasmine.createSpy("AuthenticationClient")
      .and.returnValue({ authenticate })
  })
  return authenticate
}

/**
 * Mock Authentication client authenticate operation returning with success
 *
 * @param session - Session
 *
 * @return Jasmine spy
 */
export function mockAuthenticationClientAuthenticateWithResult(
  session: Session = mockSession()
) {
  return mockAuthenticationClientAuthenticate(() => Promise.resolve(session))
}

/**
 * Mock Authentication client authenticate operation throwing an error
 *
 * @param err - Error to be thrown
 *
 * @return Jasmine spy
 */
export function mockAuthenticationClientAuthenticateWithError(
  err: Error = new Error("mockAuthenticationClientAuthenticateWithError")
): jasmine.Spy {
  return mockAuthenticationClientAuthenticate(() => Promise.reject(err))
}
