import { SearchUserForm } from '../organizms/forms/SearchUser/SearchUserForm';

export const SearchSection = () => {
  return (
    <section className="search-section">
      <div className="search-tabs">
        <input type="radio" id="basic-search" name="search-type" defaultChecked />
        <input type="radio" id="advanced-search" name="search-type" />
        <div className="tabs-labels">
          <label htmlFor="basic-search" className="tab-label">Basic Search</label>
          <label htmlFor="advanced-search" className="tab-label">Advanced Search</label>
        </div>
        <div className="search-tabs-content box-shadow">
          <div className="tab-content basic">
            <SearchUserForm />
          </div>
          <div className="tab-content advanced">
            <form>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="John Smith" />
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="john.smith@leverx.com" />
              <div className="row">
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" name="phone" placeholder="Phone number" />
                </div>
                <div>
                  <label htmlFor="skype">Skype</label>
                  <input type="text" id="skype" name="skype" placeholder="SkypeID" />
                </div>
              </div>
              <div className="row">
                <div>
                  <label htmlFor="building">Building</label>
                  <select id="building" name="building">
                    <option value="any">Any</option>
                    <option value="building1">Building 1</option>
                    <option value="building2">Building 2</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="room">Room</label>
                  <input type="text" id="room" name="room" placeholder="303.1" />
                </div>
              </div>
              <label htmlFor="department">Department</label>
              <select id="department" name="department">
                <option value="any">Any</option>
                <option value="dept1">Department 1</option>
                <option value="dept2">Department 2</option>
              </select>
              <button className="blue-button" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};