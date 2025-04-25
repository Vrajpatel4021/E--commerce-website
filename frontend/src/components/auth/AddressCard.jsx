import PropTypes from 'prop-types';

export default function AddressCard({
    _id,
    country,
    city,
    address1,
    address2,
    zipCode,
    addressType,
}) {
    return (
        <div className="w-full h-max bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-2xl border border-neutral-600 shadow-lg grid grid-cols-12 gap-6">
            {[
                { label: 'Country', value: country },
                { label: 'City', value: city },
                { label: 'Address 1', value: address1 },
                { label: 'Address 2', value: address2 },
                { label: 'Zip Code', value: zipCode },
                { label: 'Address Type', value: addressType },
            ].map((item, index) => (
                <div
                    key={index}
                    className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 transform transition duration-300 hover:scale-105"
                >
                    <div className="w-full h-max bg-neutral-700 rounded-xl p-4 flex flex-col gap-y-2 hover:bg-neutral-600">
                        <div className="w-full h-max break-all text-xl font-semibold text-white">
                            {item.label}
                        </div>
                        <div className="w-full h-max break-all text-lg font-light text-white">
                            {item.value || 'N/A'}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

AddressCard.propTypes = {
    _id: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address1: PropTypes.string.isRequired,
    address2: PropTypes.string.isRequired,
    zipCode: PropTypes.number.isRequired,
    addressType: PropTypes.string.isRequired,
};