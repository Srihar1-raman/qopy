// Existing app policy retained; website wording reflects the current frontend.
export function TermsContent() {
  return <div className="legal-copy">
              <p><strong>Last updated:</strong> {new Date().getFullYear()}</p>

              <h3>1. ACCEPTANCE OF TERMS</h3>
              <p>By downloading, installing, or using qopy, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the application.</p>

              <h3>2. USE OF SOFTWARE</h3>
              <p>qopy is provided "as is" for personal use on macOS devices. You may not copy, modify, distribute, sell, or lease any part of the software without prior written consent.</p>

              <h3>3. TECHNOLOGY</h3>
              <p>qopy utilizes Apple's native on-device Optical Character Recognition (OCR) technology (Vision Framework) to extract text from screen content. All text recognition processing occurs locally on your device. No images, screenshots, or extracted text are transmitted to any external servers.</p>

              <h3>4. PRIVACY & DATA</h3>
              <p>qopy does not collect, store, or transmit any personal data, usage analytics, or user content. The application operates entirely offline. When screen recording permission is granted, qopy captures screen content solely for performing OCR text extraction within the application memory. This data is not saved, logged, or shared with any third party.</p>

              <h3>5. PERMISSIONS</h3>
              <p>qopy requires certain macOS permissions to function: screen recording and accessibility. These permissions are used exclusively for capturing screen content and enabling global hotkeys. The permissions are not used for any purpose other than core text extraction functionality.</p>

              <h3>6. DISCLAIMER</h3>
              <p>qopy is provided without warranties of any kind, express or implied. The software is not guaranteed to be error-free or uninterrupted. Use of the software is at the user's own risk.</p>

              <h3>7. LIMITATION OF LIABILITY</h3>
              <p>In no event shall the developers of qopy be liable for any damages arising out of the use or inability to use the software, including but not limited to loss of data, profits, or business interruption.</p>

              <h3>8. WEBSITE</h3>
              <p>The website at qopy.site does not include a client-side analytics script. Its hosting provider may process request data to deliver and protect the site. This is separate from the downloaded Mac application.</p>

              <h3>9. CONTACT</h3>
              <p>For questions about these terms, contact through the GitHub repository or Twitter.</p>
  </div>;
}

export function PrivacyContent() {
  return <div className="legal-copy">
              <p><strong>Last updated:</strong> {new Date().getFullYear()}</p>

              <h3>1. PRIVACY COMMITMENT</h3>
              <p>qopy operates entirely offline. All text recognition happens locally on the device using Apple's Vision Framework.</p>

              <h3>2. WHAT IS NOT COLLECTED</h3>
              <ul>
                <li>No personal information</li>
                <li>No usage analytics or telemetry</li>
                <li>No screenshots or images</li>
                <li>No extracted text or clipboard content</li>
                <li>No device or usage statistics</li>
                <li>No cookies or tracking</li>
              </ul>

              <h3>3. HOW qopy WORKS</h3>
              <p>qopy uses Apple's built-in Vision Framework (OCR) to recognize text from screen content. When qopy is used:</p>
              <ul>
                <li>Screen content is captured temporarily in memory only</li>
                <li>Text recognition is performed entirely on-device using Apple's native APIs</li>
                <li>Extracted text is copied directly to the clipboard</li>
                <li>All data is discarded immediately after processing</li>
                <li>Nothing is saved, stored, or transmitted</li>
              </ul>

              <h3>4. NO NETWORK TRANSMISSION</h3>
              <p>qopy does not make any network requests. The application does not connect to the internet for its core functionality. There is no server, cloud service, or third-party API involved in the text extraction process.</p>

              <h3>5. PERMISSIONS EXPLAINED</h3>
              <p>qopy requires macOS permissions to function:</p>
              <ul>
                <li><strong>Screen Recording:</strong> Required to capture screen content for text extraction. Used only when qopy is actively invoked.</li>
                <li><strong>Accessibility:</strong> Required to enable global keyboard shortcuts. Not used for any other purpose.</li>
              </ul>
              <p>These permissions are granted through macOS system settings and can be revoked at any time.</p>

              <h3>6. THIRD PARTIES</h3>
              <p>qopy does not share any data with third parties. There are no analytics providers, advertising networks, or affiliate partners.</p>

              <h3>7. CHANGES TO POLICY</h3>
              <p>If this policy is updated, it will be to clarify practices. The fundamental commitment to privacy will not change.</p>

              <h3>8. CONTACT</h3>
              <p>For privacy concerns or questions, contact through the GitHub repository.</p>
  </div>;
}
