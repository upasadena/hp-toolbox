<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h1>Gringotts Wizarding Bank</h1>
        <v-btn @click="reset">Reset</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <!-- Muggle Currencies Column -->
      <v-col cols="12" md="4">
        <v-row>
          <v-col cols="12">
            <h2>Muggle Currencies</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.number="gbp"
              label="GBP"
              :rules="[numberRule]"
              type="number"
              variant="underlined"
              prefix="£"
              :class="{ dimmed: isValueEffectivelyZero(gbp) }"
              @update:model-value="convert('gbp')"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.number="usd"
              label="USD"
              :rules="[numberRule]"
              type="number"
              variant="underlined"
              prefix="$"
              :class="{ dimmed: isValueEffectivelyZero(usd) }"
              @update:model-value="convert('usd')"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.number="nzd"
              label="NZD"
              :rules="[numberRule]"
              type="number"
              variant="underlined"
              prefix="$"
              :class="{ dimmed: isValueEffectivelyZero(nzd) }"
              @update:model-value="convert('nzd')"
            />
          </v-col>
        </v-row>
      </v-col>

      <!-- Decimal Wizarding Column -->
      <v-col cols="12" md="4">
        <v-row>
          <v-col cols="12">
            <h2>Wizarding Currency (Individual)</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.number="galleons1"
              label="Galleons (Decimal)"
              :rules="[numberRule]"
              type="number"
              variant="underlined"
              :class="{ dimmed: isValueEffectivelyZero(galleons1) }"
              @update:model-value="convert('galleons1')"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.number="sickles1"
              label="Sickles (Decimal)"
              :rules="[numberRule]"
              type="number"
              variant="underlined"
              :class="{ dimmed: isValueEffectivelyZero(sickles1) }"
              @update:model-value="convert('sickles1')"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.number="knuts1"
              label="Knuts (Decimal)"
              :rules="[numberRule]"
              type="number"
              variant="underlined"
              :class="{ dimmed: isValueEffectivelyZero(knuts1) }"
              @update:model-value="convert('knuts1')"
            />
          </v-col>
        </v-row>
      </v-col>

      <!-- Real-World Wizarding Column -->
      <v-col cols="12" md="4">
        <v-row>
          <v-col cols="12">
            <h2>Real Wizarding Coins</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.number="galleons2"
              label="Galleons"
              :rules="[numberRule]"
              type="number"
              variant="underlined"
              :class="{ dimmed: isValueEffectivelyZero(galleons2) }"
              @update:model-value="convert('galleons2')"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.number="sickles2"
              label="Sickles"
              :rules="[numberRule]"
              type="number"
              variant="underlined"
              :class="{ dimmed: isValueEffectivelyZero(sickles2) }"
              @update:model-value="convert('sickles2')"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.number="knuts2"
              label="Knuts"
              :rules="[numberRule]"
              type="number"
              variant="underlined"
              :class="{ dimmed: isValueEffectivelyZero(knuts2) }"
              @update:model-value="convert('knuts2')"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0">
            <v-checkbox
              v-model="roundUp"
              label="Round up smallest denomination"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="pt-0" cols="12">
        <h2>Exchange Rate</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-select
          v-model="selectedRate"
          item-title="name"
          item-value="name"
          :items="exchangeRates"
          label="Select Exchange Rate"
          return-object
          variant="underlined"
        />
      </v-col>
      <v-col cols="12" md="6">
        <p>{{ selectedRate.description }}</p>
      </v-col>
    </v-row>

    <v-row v-if="selectedRate.name === 'Custom Galleon Rate'">
      <v-col cols="12">
        <v-text-field
          label="GBP per Galleon"
          v-model.number="customGalleonRate"
          type="number"
          variant="underlined"
          :rules="[numberRule]"
        />
      </v-col>
    </v-row>
    <v-row v-if="selectedRate.name === 'Custom Sickle Rate'">
      <v-col cols="12">
        <v-text-field
          label="GBP per Sickle"
          v-model.number="customSickleRate"
          type="number"
          variant="underlined"
          :rules="[numberRule]"
        />
      </v-col>
    </v-row>
    <v-row v-if="selectedRate.name === 'Custom Knut Rate'">
      <v-col cols="12">
        <v-text-field
          label="GBP per Knut"
          v-model.number="customKnutRate"
          type="number"
          variant="underlined"
          :rules="[numberRule]"
        />
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'

  const gbp = ref<number | null>(null)
  const usd = ref<number | null>(null)
  const nzd = ref<number | null>(null)

  const galleons1 = ref<number | null>(null)
  const sickles1 = ref<number | null>(null)
  const knuts1 = ref<number | null>(null)

  const galleons2 = ref<number | null>(null)
  const sickles2 = ref<number | null>(null)
  const knuts2 = ref<number | null>(null)

  const customGalleonRate = ref<number | null>(null);
  const customSickleRate = ref<number | null>(null);
  const customKnutRate = ref<number | null>(null);

  const roundUp = ref(false)

  let isUpdating = false
  let lastSource = 'gbp';

  function isValueEffectivelyZero(value: number | null): boolean {
    if (value === null) {
      return true;
    }
    return Math.abs(value) < 0.000001;
  }

  function numberRule (value: any) {
    if (value === null || value === '' || /^-?\d*\.?\d+$/.test(value)) {
      return true
    }
    return 'Please enter a valid number.'
  }

  const exchangeRates = [
    {
      name: 'HP Wiki Rate (£4.94)',
      galleonToGbp: 4.94,
      description: '1 Galleon = 4.94 GBP (from HP Wiki\'s estimates of the most accurate pricing)',
    },
    {
      name: 'Approximate (£5.00)',
      galleonToGbp: 5,
      description: '1 Galleon = 5 GBP (According to J. K. Rowling, the approximate value of a Galleon is "About five Great British pounds, though the exchange rate varies!" )',
    },
    {
      name: 'Charity Textbook Rate (£5.12)',
      galleonToGbp: 5.12,
      description: '1 Galleon = 5.12 GBP — The textbooks JK wrote for charity, Fantastic Beasts and Where to Find Them and Quidditch Through the Ages, state that GB£174 million/US$250 million is equivalent to 34 million Galleons (or 34,000,872 Galleons, 14 Sickles, 7 Knuts to be exact) and works out as approximately £5.12/$7.35 per Galleon',
    },
    {
      name: 'Alternative Textbook Rate (£3.03)',
      galleonToGbp: 3.0296428569,
      description: '1 Galleon = 3.0296428569 GBP — Much like the Charity Textbook Rate, this rate is based on the price that appears on the back of the books (£4.99 or 1 Galleon, 11 Sickles; and $3.99 or 14 Sickles, 3 Knuts for the original UK and US editions respectively)',
    },
    {
      name: 'Custom Galleon Rate',
      galleonToGbp: 0, // Placeholder, will be updated by custom input
      description: 'Enter custom GBP value for 1 Galleon',
    },
    {
      name: 'Custom Sickle Rate',
      galleonToGbp: 0, // Placeholder
      description: 'Enter custom GBP value for 1 Sickle',
    },
    {
      name: 'Custom Knut Rate',
      galleonToGbp: 0, // Placeholder
      description: 'Enter custom GBP value for 1 Knut',
    },
  ]

  const selectedRate = ref(exchangeRates[0])

  const rates = {
    gbpToUsd: 1.36,
    gbpToNzd: 2.28,
    galleonToSickle: 17,
    sickleToKnut: 29,
  }

  function convert (source: string) {
    // Flag to prevent infinite loops when updating values.
    if (isUpdating) return
    isUpdating = true
    lastSource = source;

    let galleonToGbp = selectedRate.value.galleonToGbp;

    if (selectedRate.value.name === 'Custom Galleon Rate') {
        galleonToGbp = customGalleonRate.value || 0;
    } else if (selectedRate.value.name === 'Custom Sickle Rate') {
        galleonToGbp = (customSickleRate.value || 0) * rates.galleonToSickle;
    } else if (selectedRate.value.name === 'Custom Knut Rate') {
        galleonToGbp = (customKnutRate.value || 0) * rates.galleonToSickle * rates.sickleToKnut;
    }

    const knutToGbp = galleonToGbp / (rates.galleonToSickle * rates.sickleToKnut);

    let baseKnuts = 0

    // Convert the source currency to the base unit (Knuts).
    switch (source) {
      case 'gbp': {
        baseKnuts = (gbp.value || 0) / knutToGbp
        break
      }
      case 'usd': {
        baseKnuts = ((usd.value || 0) / rates.gbpToUsd) / knutToGbp
        break
      }
      case 'nzd': {
        baseKnuts = ((nzd.value || 0) / rates.gbpToNzd) / knutToGbp
        break
      }
      case 'galleons1': {
        baseKnuts = (galleons1.value || 0) * rates.galleonToSickle * rates.sickleToKnut
        break
      }
      case 'sickles1': {
        baseKnuts = (sickles1.value || 0) * rates.sickleToKnut
        break
      }
      case 'knuts1': {
        baseKnuts = knuts1.value || 0
        break
      }
      case 'galleons2':
      case 'sickles2':
      case 'knuts2': {
        baseKnuts
          = ((galleons2.value || 0) * rates.galleonToSickle * rates.sickleToKnut)
            + ((sickles2.value || 0) * rates.sickleToKnut)
            + (knuts2.value || 0)
        break
      }
    }

    // Convert from the base unit (Knuts) to all other currencies.
    if (source !== 'gbp') {
      gbp.value = baseKnuts * knutToGbp
    }
    if (source !== 'usd') {
      usd.value = (gbp.value || 0) * rates.gbpToUsd
    }
    if (source !== 'nzd') {
      nzd.value = (gbp.value || 0) * rates.gbpToNzd
    }

    if (source !== 'galleons1') {
      galleons1.value = baseKnuts / (rates.galleonToSickle * rates.sickleToKnut)
    }
    if (source !== 'sickles1') {
      sickles1.value = baseKnuts / rates.sickleToKnut
    }
    if (source !== 'knuts1') {
      knuts1.value = baseKnuts
    }

    // Update the "Real-World" wizarding currency section.
    // This section displays the currency broken down into whole Galleons, Sickles, and Knuts.
    let remainingKnuts = baseKnuts

    const galleonsValue = Math.floor(remainingKnuts / (rates.galleonToSickle * rates.sickleToKnut))
    remainingKnuts %= (rates.galleonToSickle * rates.sickleToKnut)

    const sicklesValue = Math.floor(remainingKnuts / rates.sickleToKnut)
    remainingKnuts %= rates.sickleToKnut

    let knutsValue = remainingKnuts
    knutsValue = roundUp.value ? Math.ceil(knutsValue) : Math.floor(knutsValue)

    // Only update the "Real-World" section if the source of the change was not one of its own inputs.
    if (source !== 'galleons2' && source !== 'sickles2' && source !== 'knuts2') {
      galleons2.value = galleonsValue
      sickles2.value = sicklesValue
      knuts2.value = knutsValue
    }

    // Reset the flag after a short delay to allow the UI to update.
    setTimeout(() => {
      isUpdating = false
    }, 0)
  }

  function reset() {
    gbp.value = 0;
    usd.value = 0;
    nzd.value = 0;
    galleons1.value = 0;
    sickles1.value = 0;
    knuts1.value = 0;
    galleons2.value = 0;
    sickles2.value = 0;
    knuts2.value = 0;
    lastSource = 'gbp';
  }

  // Re-run the conversion when the rounding option is changed.
  watch(roundUp, () => {
    convert(lastSource)
  })

  // Re-run the conversion when the exchange rate is changed.
  watch(selectedRate, () => {
    convert(lastSource)
  })

  watch(customGalleonRate, () => {
    if (selectedRate.value.name === 'Custom Galleon Rate') {
      convert(lastSource);
    }
  });

  watch(customSickleRate, () => {
    if (selectedRate.value.name === 'Custom Sickle Rate') {
      convert(lastSource);
    }
  });

  watch(customKnutRate, () => {
    if (selectedRate.value.name === 'Custom Knut Rate') {
      convert(lastSource);
    }
  });

</script>

<style scoped>
.dimmed {
  opacity: 0.5;
}
</style>
