export default function EventTestSuite(Event) {
	describe("Event", () => {
		describe("constructor", () => {
			it("should throw an error if type is not a string", () => {
				expect(() => {
					new Event();
				}).to.throw();

				expect(() => {
					new Event(null);
				}).to.throw();

				expect(() => {
					new Event({});
				}).to.throw();

				expect(() => {
					new Event(() => {});
				}).to.throw();
			});

			it("(String) should return an Event", () => {
				expect(new Event("string")).to.be.an.instanceOf(Event);
			});

			it("should set args to an empty array if not passed in", () => {
				expect(new Event("testing").args).to.eql([]);
			});
		});
	});
}
