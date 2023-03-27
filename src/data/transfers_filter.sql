-- Keep non-zero transaction values
DELETE FROM transfers 
WHERE transaction_value = 0;


-- Add the new column to the table
-- ALTER TABLE transfers ADD COLUMN tsdate DATE;

-- Update the values of the new column
UPDATE transfers SET tsdate = strftime('%Y-%m-%d', timestamp, 'unixepoch');

-- Limit to 1000 entries
SELECT * FROM transfers ORDER BY transaction_value DESC LIMIT 5000;

ALTER TABLE transfers ADD COLUMN eth INTEGER;
UPDATE transfers SET eth = transaction_value/1e18;

SELECT nfts.name, transfers.*
FROM nfts
JOIN transfers
ON nfts.address = transfers.nft_address
WHERE (transaction_value) IN
	(SELECT DISTINCT transaction_value FROM transfers)
ORDER BY transaction_value DESC
LIMIT 5000;

-- DELETE FROM transfers 
-- WHERE transaction_value = 1 OR transaction_value = 2;

-- WHERE (transaction_value, timestamp) IN
--     (SELECT DISTINCT transaction_value, timestamp FROM transfers);
