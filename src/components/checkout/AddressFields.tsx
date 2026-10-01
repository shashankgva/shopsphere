import FormField from './FormField';

interface AddressFieldsProps {
  prefix: 'shipping' | 'billing';
}

function AddressFields({ prefix }: AddressFieldsProps) {
  const isShipping = prefix === 'shipping';

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField
        label="First name"
        name={`${prefix}.firstName`}
        required
        autoComplete={isShipping ? 'shipping given-name' : 'billing given-name'}
      />
      <FormField
        label="Last name"
        name={`${prefix}.lastName`}
        required
        autoComplete={
          isShipping ? 'shipping family-name' : 'billing family-name'
        }
      />
      <div className="sm:col-span-2">
        <FormField
          label="Address"
          name={`${prefix}.addressLine1`}
          required
          autoComplete={
            isShipping ? 'shipping address-line1' : 'billing address-line1'
          }
        />
      </div>
      <div className="sm:col-span-2">
        <FormField
          label="Apartment, suit etc."
          name={`${prefix}.addressLine2`}
          required
          autoComplete={
            isShipping ? 'shipping address-line2' : 'billing address-line2'
          }
        />
      </div>
      <FormField
        label="City"
        name={`${prefix}.city`}
        required
        autoComplete={
          isShipping ? 'shipping address.level2' : 'billing address-level2'
        }
      />
      <FormField
        label="State"
        name={`${prefix}.state`}
        required
        autoComplete={
          isShipping ? 'shipping address-level1' : 'billing address-level1'
        }
      />
      <FormField
        label="Postal Code"
        name={`${prefix}.postalCode`}
        required
        autoComplete={
          isShipping ? 'shipping postal-code' : 'billing postal-code'
        }
      />
      <FormField
        label="Country"
        name={`${prefix}.country`}
        required
        autoComplete={
          isShipping ? 'shipping country-name' : 'billing country-name'
        }
      />
    </div>
  );
}
export default AddressFields;
